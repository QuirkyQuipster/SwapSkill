from django.db import models
from django.contrib.auth.models import User


class SwapRequest(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('rejected', 'Rejected'),
    ]
    from_user = models.ForeignKey(User, related_name='sent_requests', on_delete=models.CASCADE)
    to_user = models.ForeignKey(User, related_name='received_requests', on_delete=models.CASCADE)
    skill = models.CharField(max_length=100)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.from_user} → {self.to_user} ({self.skill})"


class SwapRating(models.Model):
    """Model for rating completed swaps."""
    
    swap_request = models.ForeignKey(
        SwapRequest, 
        on_delete=models.CASCADE, 
        related_name='ratings'
    )
    rater = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        related_name='given_ratings'
    )
    rated_user = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        related_name='received_ratings'
    )
    rating = models.IntegerField(choices=[(i, i) for i in range(1, 6)])
    comment = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ['swap_request', 'rater']
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.rater.email} rated {self.rated_user.email}: {self.rating}/5"
    
    def save(self, *args, **kwargs):
        # Update the rated user's average rating
        super().save(*args, **kwargs)
        self.rated_user.update_rating(self.rating) 