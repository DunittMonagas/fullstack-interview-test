

from rest_framework import status
from rest_framework import viewsets
from rest_framework.response import Response


from utils.git_controller import GitController, BranchNotFountError


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
        """
        Returns detailed information of the requested branch.

        All commits of the branch with:
            * hexsha (hex version of sha)
            * Author
            * Messages per commit (first line of the message)
            * timestamps (int seconds since epoch is the committed DateTime)
        """

        git_controller = GitController()

        try:
            branch = git_controller.get_branch(pk)

        except BranchNotFountError:
            return Response(
                {'error': f'Branch {pk} not found.'},
                status=status.HTTP_404_NOT_FOUND, 
            )

        commits = []
        for current_commit in branch['commits']:
            commits.append({
                'hexsha': current_commit.hexsha, 
                'summary': current_commit.summary, 
                'name': current_commit.author.name,
                'timestamps': current_commit.committed_date, 
            })

        return Response({
            'branch': branch['branch'], 
            'head': branch['head'].hexsha, 
            'commits': commits, 
        })

