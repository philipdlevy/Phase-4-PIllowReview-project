class ReviewsController < ApplicationController

    def index
        reviews = Review.all
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
        user = User.find_by(id: session[:user_id])
        if user
            review = user.reviews.create(review_params)
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
        review = Review.find(params[:id])
        review.destroy
        head :no_content
    end



    private

    def review_params
        params.permit(:title, :body, :rating, :item_id, :user_id)
    end
end
