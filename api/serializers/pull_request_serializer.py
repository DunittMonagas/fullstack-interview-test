

from rest_framework import serializers
from rest_framework.serializers import ValidationError


from ..models import PullRequest
from utils.git_controller import GitController


class PullRequestSerializer(serializers.ModelSerializer):
    class Meta:
        fields = "__all__"
        model = PullRequest

    def create(self, validated_data, *args, **kwargs):
        """
        """
        # print(args)
        # print(kwargs)
        # print(self.__dict__)
        # print(validated_data)
        git_controller = GitController()

        if validated_data['status'] == PullRequest.Status.MERGED:
            
            merge_result, conflict_description = git_controller.merge(
                validated_data['compare_branch'], 
                validated_data['base_branch'], 
            )

            validated_data['conflict'] = merge_result
            validated_data['conflict_description'] = conflict_description or ""

            if not merge_result:
                validated_data['status'] = PullRequest.Status.OPEN
            
        instance = PullRequest.objects.create(**validated_data)


    def validate_status(self, value, *args, **kwargs):
        """
        Validates the status and all its transitions:
            * Only pull requests with open status or merge can be created.
            * Merged or closed status cannot be modified.
        """

        method = self.context['request'].method

        if method == 'POST' and value == PullRequest.Status.CLOSED:
            # Only pull requests with open status or merge can be created.
            raise ValidationError(
                'Cannot create a pull request with status closed.'
            )

        elif method in ['PUT', 'PATCH']:
            
            id = self.context['request'].parser_context['kwargs']['pk']
            current_status = PullRequest.objects.get(id=id).status

            if current_status in [
                PullRequest.Status.MERGED, PullRequest.Status.CLOSED
            ]:
                # Merged or closed status cannot be modified.
                raise ValidationError(
                    'Cannot modify a pull request with status merged/closed.'
                )

        return value

    def validate(self, data):
        """
        Validation:
            * Verify the existence of the branches to be operated.
            * You cannot merge a branch on itself.
        """
        
        git_controller = GitController()
        all_branches = [
            branch.name for branch in git_controller.get_branches()
        ]

        if data['base_branch'] not in all_branches:
            raise ValidationError(f"{data['base_branch']} does not exist.")

        if data['compare_branch'] not in all_branches:
            raise ValidationError(f"{data['compare_branch']} does not exist.")

        if data['base_branch'] == data['compare_branch']:
            raise ValidationError(
                'Base branch and compare branch cannot be the same.'
            )

        return data

