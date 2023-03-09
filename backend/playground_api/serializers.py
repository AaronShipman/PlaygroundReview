from rest_framework import serializers
from .models import Playground, Review
from django.utils import timezone


class PlaygroundSerializer(serializers.Serializer):
    park_name = serializers.CharField(max_length=120)
    address = serializers.CharField()
    rating = serializers.CharField()
    description = serializers.CharField()
    id = serializers.IntegerField(read_only=True)
    created_at = serializers.DateTimeField(read_only=True)

    def create(self, validated_data):
        return Playground.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.park_name = validated_data.get('park_name', instance.park_name)
        instance.address = validated_data.get('address', instance.address)
        instance.rating = validated_data.get('rating', instance.rating)
        instance.id = validated_data.get('id', instance.id)
        instance.description = validated_data.get('description', instance.description)
        instance.save()
        return instance
    
class PlaygroundReviewSerializer(serializers.Serializer):
    park_name = serializers.CharField(max_length=120)
    # address = serializers.CharField()
    rating = serializers.CharField()
    # description = serializers.CharField()
    review_rating = serializers.IntegerField(default=0)
    author = serializers.CharField(max_length=50)
    description = serializers.CharField()
    created_at = serializers.DateTimeField(default=timezone.now)

    def create(self, validated_data):
        # extract Playground and Review data from validated_data
        playground_data = {
            'park_name': validated_data['park_name'],
            # 'description': validated_data['description'],
            'rating': validated_data['rating'],
            
        }
        review_data = {
            'rating': validated_data['review_rating'],
            'review_text': validated_data['description'],
            'author': validated_data['author']
        }
        # create Playground and Review objects
        playground = Playground.objects.create(**playground_data)
        review = Review.objects.create(**review_data, playground=playground)
        return review


    

# class PlaygroundSerializer(serializers.ModelSerializer):
#     ratings = serializers.PrimaryKeyRelatedField(many=True, read_only=True) 

#     class Meta:
#         model = Playground
#         fields = '__all__'

# class ReviewSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Rating
#         fields = '__all__'