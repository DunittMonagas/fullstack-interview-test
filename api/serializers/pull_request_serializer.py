

from rest_framework import serializers


from ..models import PullRequest


class PullRequestSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id', 
            'author', 
            'title', 
            'description', 
            'status', 
            'base_branch', 
            'compare_branch',
        )
        model = PullRequest

