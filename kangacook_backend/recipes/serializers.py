
from rest_framework import serializers
from .models import Recipe

# Serializer for the Recipe model
class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = '__all__'
