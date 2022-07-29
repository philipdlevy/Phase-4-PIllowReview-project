class Review < ApplicationRecord
    belongs_to :item
    belongs_to :user

    validates :title, presence: true
    validates :body, presence: true, length: {maximum: 150}
    validates :rating, presence: true
    validates :rating, :inclusion => 1..5
end
