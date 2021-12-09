

import os
from django.test import TestCase
from git.exc import GitCommandError


from utils.git_controller import GitController, BranchNotFountError


class TestGitController(TestCase):
    """
    Unit tests for the GitPython driver.
    """
    def setUp(self):
        self.git_controller = GitController()
    
    def test_environment_variable(self):
        """
        Verify that the environment variable has been loaded correctly.
        """
        repo_dir = os.environ.get('REPO_DIR', '')
        setup_repo_dir = self.git_controller.repo_dir

        self.assertEqual(repo_dir, setup_repo_dir)

    def test_get_branches(self):
        """
        Unit test to obtain all branches. 
        Verify the presence of the "master" branch.
        """
        branches = self.git_controller.get_branches()
        self.assertIsInstance(branches, list)
        branch_names = [branch.name for branch in branches]
        self.assertTrue('master' in branch_names)

    def test_get_branch(self):
        """
        Verify that it correctly returns the requested branch 
        with its respective structure.
        """
        branch_name = 'master'
        branch = self.git_controller.get_branch(branch_name)

        self.assertIsInstance(branch, dict)
        self.assertTrue('branch' in branch)
        self.assertTrue('head' in branch)
        self.assertTrue('commits' in branch)
        self.assertIsInstance(branch['commits'], list)
        self.assertEqual(branch['branch'], branch_name)

        last_commit = branch['commits'][0].hexsha
        self.assertEqual(last_commit, branch['head'].hexsha)
    
    def test_nonexistent_branch(self):
        """
        Validates the exception when no branch is found.
        """
        self.assertRaises(
            BranchNotFountError,
            self.git_controller.get_branch,
            'anything' # branch name
        )
        
    def test_get_commit(self):
        """
        Unit test to obtain the most recent commit of the "master" branch.
        """
        branch_name = 'master'
        branch = self.git_controller.get_branch(branch_name)
        commit_hexsha = branch['head'].hexsha

        commit = self.git_controller.get_commit(commit_hexsha)
        self.assertEqual(commit.hexsha, commit_hexsha)

    def test_nonexistent_commit(self):
        """
        Validates the exception when a commit is not found,
        """
        self.assertRaises(
            GitCommandError, 
            self.git_controller.get_commit, 
            'anything' # commit hexsha
        )

    def test__get_commits(self):
        """
        Unit test to get all commits from the "master" branch.
        """
        branch_name = 'master'
        branch = self.git_controller.get_branch(branch_name)
        head = branch['head']
        commits = self.git_controller._get_commits(head)

        self.assertIsInstance(commits, list)
        self.assertTrue(len(commits) >= 1) # 
        self.assertEqual(head.hexsha, commits[0].hexsha)

    def test_nonexistent_head(self):
        """
        Validates the exception when no commit is found.
        """
        binsha = 'anything'
        commits = self.git_controller._get_commits(binsha)
        self.assertIsInstance(commits, list)
        self.assertTrue(len(commits) == 0)
