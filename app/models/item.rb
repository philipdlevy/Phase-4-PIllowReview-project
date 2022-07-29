class Item < ApplicationRecord
    has_many :reviews, dependent: :destroy

    validates :name, presence: true
    validates :price, presence: true
    validates :image_url, presence: true
    validates :description, length: {minimum: 50}
end
