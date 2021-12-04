

from django.db import models


class PullRequest(models.Model):
    """

    """
    class Status(models.TextChoices):
        OPEN = 'OP', 'Open'
        CLOSED = 'CL', 'Closed'
        MERGED = 'MD', 'Merged'

    # original branch
    base_branch = models.CharField(
        max_length=32, 
        null=False, 
        blank=False,
        verbose_name="the repository's base branch",
    )

    # modified branch
    compare_branch = models.CharField(
        max_length=32, 
        null=False, 
        blank=False,
        verbose_name="your branch (the compare branch)",
    )

    author = models.CharField(
        max_length=32, 
        null=False, 
        blank=False,
    )

    title = models.CharField(
        max_length=32, 
        null=False, 
        blank=False,
    )

    description = models.TextField(
        max_length=256, 
        null=False, 
        blank=True,
        default='',
    )

    status = models.CharField(
        max_length=2,
        choices=Status.choices,
        default=Status.OPEN,
    )

