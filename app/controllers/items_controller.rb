class ItemsController < ApplicationController

    def index
        items = Item.all
        render json: items
    end

    def show
        item = Item.find(params[:id])
        render json: item
    end

    def create
        item = Item.create(item_params)
        # byebug
        render json: item
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
