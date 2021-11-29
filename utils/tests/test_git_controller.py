

import os
from django.test import TestCase
from git.exc import GitCommandError


from utils.git_controller import GitController, BranchNotFountError


class TestGitController(TestCase):

    def setUp(self):
        self.git_controller = GitController()
    
    def test_environment_variable(self):
        """
        """
        repo_dir = os.environ.get('REPO_DIR', '')
        setup_repo_dir = self.git_controller.repo_dir

        self.assertEqual(repo_dir, setup_repo_dir)

    def test_get_branches(self):
        """
        """
        branches = self.git_controller.get_branches()
        self.assertIsInstance(branches, list)
        branch_names = [branch.name for branch in branches]
        self.assertTrue('master' in branch_names)

    def test_get_branch(self):
        """
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
        """
        self.assertRaises(
            BranchNotFountError,
            self.git_controller.get_branch,
            'anything' # branch name
        )
        
    def test_get_commit(self):
        """
        """
        branch_name = 'master'
        branch = self.git_controller.get_branch(branch_name)
        commit_hexsha = branch['head'].hexsha

        commit = self.git_controller.get_commit(commit_hexsha)
        self.assertEqual(commit.hexsha, commit_hexsha)

    def test_nonexistent_commit(self):
        """
        """
        self.assertRaises(
            GitCommandError, 
            self.git_controller.get_commit, 
            'anything' # commit hexsha
        )

    def test__get_commits(self):
        """
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
        """
        binsha = 'anything'
        commits = self.git_controller._get_commits(binsha)
        self.assertIsInstance(commits, list)
        self.assertTrue(len(commits) == 0) #