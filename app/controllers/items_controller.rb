require "pry"

class ItemsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

    def index
        items = Item.all
        render json: items
        # if params[:item_id]
        #     item = Item.find(params[:item_id])
        #     reviews = item.reviews
        # else
        #     items = Review.all
        # end
        # render json: reviews
    end

    def show
        # binding.pry
        item = Item.find_by(id: params[:id])
        if item
            render json: item
        else
            render json: {error: "Item Not Found"}, status: :not_found
        end


        # if params[:item_id]
        #     item = Item.find(params[:item_id])
        #     reviews = item.reviews
        # else
        #     reviews = Review.all
        # end
        # render json: reviews

        # if params[:item_id]
        #     item = Item.find(params[:item_id])
        #     reviews = item.reviews
        # else
        #     reviews = Review.all
        # end
        # render json: reviews
    end


    # custom route to get items belonging to a user
    def filter
        # binding.pry
        user = User.find_by(id: session[:user_id])
        if user
            filteredItems = user.items.uniq
            render json: filteredItems
        else
            render json: {errors: user.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def create
        item = Item.create!(item_params)
        render json: item, status: :created
    rescue ActiveRecord::RecordInvalid => invalid
        render json: {errors: invalid.record.errors}, status: :unprocessable_entity
    end

    def update 
        item = Item.find(params[:id])
        item.update!(item_params)
        render json: item
    rescue ActiveRecord::RecordInvalid => invalid
        render json: {errors: invalid.record.errors}, status: :unprocessable_entity
    end

    def destroy
        # binding.pry
        item = Item.find(params[:id])
        item.destroy
        head :no_content
    end


    private

    def item_params
        params.permit(:name, :price, :description, :image_url)
    end

end
