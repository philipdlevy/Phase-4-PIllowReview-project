require 'pry'

class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :title, :body, :rating, :reviewUsername

  belongs_to :user
  belongs_to :item


  def reviewUsername
    user = User.find(self.object.user_id)
    user.username
  end
end
