

import os
import logging
from typing import List, Dict, Union


from git import Repo, Commit, Head
from git.exc import GitCommandError


class BranchNotFountError(Exception):
    """Exception raised for errors in the branch name.

    Attributes:
        branch_name -- branch name not found
        message -- explanation of the error
    """

    def __init__(self, branch_name, message='Branch {} not found!'):
        self.branch_name = branch_name
        self.message = message.format(self.branch_name)
        super().__init__(self.message)


class GitController():
    """
    """
    def __init__(self, repo_dir: str = None):

        self.repo_dir = repo_dir or os.environ.get('REPO_DIR', '')
        self._repo = Repo(self.repo_dir)

    def get_branches(self) -> List[Head]:
        """
        """
        # print(self._repo)
        return [branch for branch in self._repo.heads]

    def _get_commits(self, commit: Union[str, Commit]) -> List[Commit]:
        """
        """
        try:
            return list(self._repo.iter_commits(commit))

        except GitCommandError as error:
            return []

    def get_branch(self, branch_name: str) -> Dict:
        """
        """
        # branch.commit.hexsha (head)
        # branch.commit.author
        # branch.commit.message or branch.commit.summary (summary: first line)
        # branch.commit.stats.total['files']
        # list commits
        # for commit in repo.iter_commits(branch.commit):
        #     print(commit)
        branch = None
        for current_branch in self._repo.heads:
            if branch_name == current_branch.name:
                branch = current_branch
                break

        if branch is None:
            # There is not branch branch_name
            raise BranchNotFountError(branch_name)
        
        return {
            'branch': branch.name, 
            'head': branch.commit, 
            'commits': self._get_commits(branch.commit.hexsha)
        }

    def get_commit(self, hexsha: Union[str, Commit]) -> Commit:
        """
        """
        # commit.hexsha
        # commit.author
        # commit.message or commit.summary (summary: first line)
        # branch.commit.stats.total['files']

        try:
            return list(Commit.iter_items(self._repo, hexsha))[0]

        except GitCommandError:
            logging.error(f'Commit "{hexsha}" not found')
            raise
        