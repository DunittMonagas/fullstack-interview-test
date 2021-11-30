

from rest_framework import status
from rest_framework import viewsets
from rest_framework.response import Response


from utils.git_controller import GitController


class BranchViewSet(viewsets.ViewSet):
    """
    Interface to access the branches.

    Allowed methods: GET

    * list: Name of all branches.
    * retrieve: A branch in detail.
    """
    def list(self, request):
        """
        Returns the names of all local branches in the repository.
        """
        git_controller = GitController()
        branches = git_controller.get_branches()
        branches = [current_branch.name for current_branch in branches]

        return Response({
            'branches': branches, 
        })

    def retrieve(self, request, pk=None):
        dummy_data = [
            {'name': 'Branch A', 'description': 'Description A'}, 
            {'name': 'Branch B', 'description': 'Description B'}, 
            {'name': 'Branch C', 'description': 'Description C'}, 
            {'name': 'Branch D', 'description': 'Description D'}, 
            {'name': 'Branch E', 'description': 'Description E'}, 
        ]

        for branch in dummy_data:
            if pk == branch['name']:
                return Response(branch)
        
        return Response(
            {'error': f'Branch {pk} not found.'},
            status=status.HTTP_404_NOT_FOUND, 
        )


