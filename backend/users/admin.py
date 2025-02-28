from django.contrib import admin
from .models import CustomUser  # Import your CustomUser model

@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('id', 'email', 'username', 'is_active', 'is_staff')  # Customize fields shown in list
    search_fields = ('email', 'username')  # Enable search by email and username
    list_filter = ('is_active', 'is_staff')  # Filter options

# Alternative way:
# admin.site.register(CustomUser, CustomUserAdmin)
