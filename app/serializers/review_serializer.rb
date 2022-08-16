require 'pry'

class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :title, :body, :rating, :user

  belongs_to :user
  belongs_to :item

  def user
    user = User.find(self.object.user_id)
    {id: user.id, username: user.username}
  end
end
