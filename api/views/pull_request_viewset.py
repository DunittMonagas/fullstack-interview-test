

from rest_framework import status
from rest_framework import mixins
from rest_framework import viewsets
from rest_framework.response import Response


from ..models import PullRequest
from ..serializers import PullRequestSerializer


class PullRequestViewSet(
    mixins.CreateModelMixin,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    viewsets.GenericViewSet
):
    serializer_class = PullRequestSerializer
    queryset = PullRequest.objects.all()


