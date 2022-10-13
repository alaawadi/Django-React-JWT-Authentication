from django.db import models
# from django.contrib.auth.models import User

# Create your models here.


class Note(models.Model):
    user = models.ForeignKey('User', on_delete=models.CASCADE, null=True)
    body = models.TextField()



from django.dispatch import receiver
from django.urls import reverse
from django_rest_passwordreset.signals import reset_password_token_created
from django.core.mail import send_mail  


@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):

    email_plaintext_message = "{}?token={}".format(reverse('password_reset:reset-password-request'), reset_password_token.key)

    send_mail(
        # title:
        "Password Reset for {title}".format(title="Some website title"),
        # message:
        email_plaintext_message,
        # from:
        "noreply@somehost.local",
        # to:
        [reset_password_token.user.email]
    )



class Code(models.Model):
    code = models.IntegerField()
    user = models.ForeignKey('User',on_delete=models.CASCADE)



from django.contrib.auth.models import AbstractUser



class User(AbstractUser):
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15,unique=True,null=True,blank=True)
    email_active = models.BooleanField(default=False)
    phone_active = models.BooleanField(default=False)
    # is_email_verified = models.BooleanField(default=False)

    def __str__(self):
        return self.username

from django.db.models.signals import post_save
from django.dispatch import receiver
import random

@receiver(post_save, sender=User)
def create_user_code(sender, instance, created, **kwargs):
    if created:
        Code.objects.create(user=instance,code= random.randrange(0,999999))



