

from django.urls import path
from rest_framework.routers import SimpleRouter


from .views import (
    BranchViewSet, 
    CommitViewSet, 
    PullRequestViewSet, 
)


router = SimpleRouter()
router.register(r'commits', CommitViewSet, basename='commits')
router.register(r'branches', BranchViewSet, basename='branches')
router.register(r'pull-request', PullRequestViewSet, basename='pull-request')

urlpatterns = router.urls

