class ReviewsController < ApplicationController

    def index
        reviews = Review.all
        render json: reviews
    end

    def show
        review = Review.find(params[:id])
        render json: review
    end

    def create
        user = User.find_by(id: session[:user_id])
        if user
            review = user.reviews.create(review_params)
            if review.valid?
                render json: review, status: :created
            else
                render json: {errors: ["Unprocessable Entity"]}, status: :unprocessable_entity
            end
        else
            render json: {errors: ["Unauthorized"]}, status: :unauthorized
        end
    end

    def destroy
        review = Review.find(params[:id])
        review.destroy
        head :no_content
    end



    private

    def review_params
        params.permit(:title, :body, :rating, :item_id, :user_id)
    end
end
