

from rest_framework import status
from rest_framework import viewsets
from rest_framework.response import Response


class BranchViewSet(viewsets.ViewSet):
    """

    """
    def list(self, request):
        dummy_data = [
            {'name': 'Branch A', 'description': 'Description A'}, 
            {'name': 'Branch B', 'description': 'Description B'}, 
            {'name': 'Branch C', 'description': 'Description C'}, 
            {'name': 'Branch D', 'description': 'Description D'}, 
            {'name': 'Branch E', 'description': 'Description E'}, 
        ]

        return Response({
            'branches': dummy_data, 
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


