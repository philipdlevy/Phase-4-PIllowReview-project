class Review < ApplicationRecord
    belongs_to :item
    belongs_to :user

    validates :title, presence: true
    validates :body, presence: true, length: {minimum: 1, maximum: 150}
    validates :rating, presence: true, :inclusion => 1..5
    # validates :rating, :inclusion => 1..5
end
