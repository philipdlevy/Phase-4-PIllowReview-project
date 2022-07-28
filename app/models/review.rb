class Review < ApplicationRecord
    belongs_to :item
    belongs_to :user

    validates :title, presence: true
    validates :body, presence: true
    validates :rating, presence: true
end
