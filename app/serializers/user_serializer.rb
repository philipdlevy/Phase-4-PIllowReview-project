class UserSerializer < ActiveModel::Serializer
  attributes :id, :username

  has_many :reviews
  has_many :items, through: :reviews
end
