

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
        Cases:
            * When the status is OPEN, it simply returns the newly created instance.
            * When the status is MERGED, it tries to apply the operation and returns 
              an instance with the result obtained. In case of finding an unresolved 
              conflict, it does not modify the state of the pull request.
        """
        git_controller = GitController()

        if validated_data['status'] == PullRequest.Status.MERGED:
            
            merge_result, conflict_description = git_controller.merge(
                validated_data['compare_branch'], 
                validated_data['base_branch'], 
            )

            validated_data['conflict'] = not merge_result
            validated_data['conflict_description'] = conflict_description or ""

            if not merge_result:
                validated_data['status'] = PullRequest.Status.OPEN
            
        instance = PullRequest.objects.create(**validated_data)

        return instance

    def update(self, instance, validated_data):
        """
        Cases:
            * In case of updating the status to closed, simply assign the new status.
            * For the merge case, it tries to apply the operation and returns an instance 
              with the obtained result. In case of finding an unresolved conflict, 
              it does not modify the state of the pull request.
        """
        git_controller = GitController()
        instance.status = validated_data.get('status', instance.status)

        if instance.status == PullRequest.Status.MERGED:
            
            merge_result, conflict_description = git_controller.merge(
                instance.compare_branch, 
                instance.base_branch, 
            )

            instance.conflict = not merge_result
            instance.conflict_description = conflict_description or ""           

            if not merge_result:
                instance.status = PullRequest.Status.OPEN 

        instance.save()

        return instance


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
            * Checks whether the status is found.
        """
        
        method = self.context['request'].method

        git_controller = GitController()
        all_branches = [
            branch.name for branch in git_controller.get_branches()
        ]

        if method in ['PUT', 'POST']:
            if data.get('base_branch') not in all_branches:
                raise ValidationError(
                    f"{data['base_branch']} does not exist."
                )

            if data.get('compare_branch') not in all_branches:
                raise ValidationError(
                    f"{data['compare_branch']} does not exist."
                )

            if data['base_branch'] == data['compare_branch']:
                raise ValidationError(
                    'Base branch and compare branch cannot be the same.'
                )

        elif method == 'PATCH':
            if not data.get('status'):
                raise ValidationError('Status not found.')

        return data

