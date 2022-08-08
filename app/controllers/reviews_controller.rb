require 'pry'

class ReviewsController < ApplicationController

    def index
        # reviews = Review.all
        # render json: reviews
        if params[:item_id]
            item = Item.find(params[:item_id])
            reviews = item.reviews
        else
            reviews = Review.all
        end
        render json: reviews
    end

    def show
        review = Review.find(params[:id])
        if review
            render json: review
        else
            render json: {error: "Review Not Found"}, status: :not_found
        end
    end

    def create
        # binding.pry
        user = User.find_by(id: session[:user_id])
        #New line 
        item = Item.find(params[:item_id])
        if user
            review = user.reviews.create(review_params)
            itemReview = item.reviews.create(review_params)
            if review.valid?
                render json: review, status: :created
            else
                render json: {errors: review.errors.full_messages}, status: :unprocessable_entity
            end
        else
            render json: {errors: ["Unauthorized"]}, status: :unauthorized
        end
    end

    def update 
        review = Review.find(params[:id])
        review.update!(review_params)
        render json: review
    rescue ActiveRecord::RecordInvalid => invalid
        render json: {errors: invalid.record.errors}, status: :unprocessable_entity
    end

    def destroy
        user = User.find_by(id: session[:user_id])
        item = Item.find(params[:item_id])
        if user
            userReview = user.reviews.find(params[:id])
            itemReview = item.reviews.find(params[:id])
            if review.valid?
        # review = Review.find(params[:id])
            review.destroy
            head :no_content
            else
                render json: {errors: review.errors.full_messages}, status: :unprocessable_entity
            end
        else
            render json: {errors: ["Unauthorized"]}, status: :unauthorized
        end
    end



    private

    def review_params
        params.permit(:title, :body, :rating, :item_id, :user_id)
    end
end
