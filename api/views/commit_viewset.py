

from rest_framework import status
from rest_framework import viewsets
from rest_framework.response import Response


class CommitViewSet(viewsets.ViewSet):
    """

    """
    def retrieve(self, request, pk=None):
        dummy_data = [
            {'name': 'Commit A', 'description': 'Description A'}, 
            {'name': 'Commit B', 'description': 'Description B'}, 
            {'name': 'Commit C', 'description': 'Description C'}, 
            {'name': 'Commit D', 'description': 'Description D'}, 
            {'name': 'Commit E', 'description': 'Description E'}, 
        ]

        for commit in dummy_data:
            if pk == commit['name']:
                return Response(commit)
        
        return Response(
            {'error': f'Commit {pk} not found.'},
            status=status.HTTP_404_NOT_FOUND, 
        )


