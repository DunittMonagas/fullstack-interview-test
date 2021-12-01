

from git import GitCommandError
from rest_framework import status
from rest_framework import viewsets
from rest_framework.response import Response


from utils.git_controller import GitController


class CommitViewSet(viewsets.ViewSet):
    """

    """
    def retrieve(self, request, pk=None):

        git_controller = GitController()
        
        try:
            commit = git_controller.get_commit(pk)

        except GitCommandError:
            return Response(
                {'error': f'Commit {pk} not found.'},
                status=status.HTTP_404_NOT_FOUND, 
            )

        return Response({
            'hexsha': commit.hexsha, 
            'message': commit.message, 
            'name': commit.author.name,
            'email': commit.author.email,
            'timestamps': commit.committed_date, 
            'files_changed': commit.stats.total['files'], 
        })
        


