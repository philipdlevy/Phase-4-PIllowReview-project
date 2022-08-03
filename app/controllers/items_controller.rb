require "pry"

class ItemsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

    def index
        items = Item.all
        render json: items
    end

    def show
        # item = Item.find_by(id: params[:id])
        # if item
        #     render json: item
        # else
        #     render json: {error: "Item Not Found"}, status: :not_found
        # end


        # if params[:item_id]
        #     item = Item.find(params[:item_id])
        #     reviews = item.reviews
        # else
        #     reviews = Review.all
        # end
        # render json: reviews

        if params[:item_id]
            item = Item.find(params[:item_id])
            reviews = item.reviews
        else
            reviews = Review.all
        end
        render json: reviews
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
        item = Item.find(params[:id])
        item.destroy
        head :no_content
    end


    private

    def item_params
        params.permit(:name, :price, :description, :image_url)
    end

end
