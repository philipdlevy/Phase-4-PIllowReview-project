class Item < ApplicationRecord
    has_many :reviews, dependent: :destroy

    validates :name, presence: true
    validates :price, presence: true, numericality: {greater_than: 0}
    validates :image_url, presence: true
    validates :description, length: {minimum: 25}
end
