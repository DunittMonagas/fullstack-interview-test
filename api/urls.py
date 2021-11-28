

from django.urls import path
from rest_framework.routers import SimpleRouter


from .views import BranchViewSet


router = SimpleRouter()
router.register(r'branches', BranchViewSet, basename='branches')

urlpatterns = router.urls

