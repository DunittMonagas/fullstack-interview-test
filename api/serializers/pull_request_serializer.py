

from rest_framework import serializers
from rest_framework.serializers import ValidationError


from ..models import PullRequest
from utils.git_controller import GitController


class PullRequestSerializer(serializers.ModelSerializer):
    class Meta:
        fields = "__all__"
        model = PullRequest

    def validate_status(self, value):
        """
        """
        if value == PullRequest.Status.CLOSED:
            raise ValidationError('Cannot create a pull request with status closed.')

        return value

    def validate(self, data):
        git_controller = GitController()
        all_branches = [branch.name for branch in git_controller.get_branches()]

        if data['base_branch'] not in all_branches:
            raise ValidationError(f"{data['base_branch']} does not exist.")

        if data['compare_branch'] not in all_branches:
            raise ValidationError(f"{data['compare_branch']} does not exist.")

        return data

