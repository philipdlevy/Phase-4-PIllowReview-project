Online pillow review website

Overview: (Features)
- User(customer)
- Items
- Reviews
- Login/out


MVP:
- Login/out
- look at items
- leave a review
- create, update, delete and see items
- create, update, delete and see reviews


Models
- user
- review
- item

Associations and attributes:

# User
- has_many :reviews
- has_many :items, through: :carts

# Attributes
- username :string
- password_digest :string

-----------------------------------------

# Item
- has_many :reviews

# Attributes
- name :string
- price :float
- description :text
- image_url :string

-----------------------------------------

# Review
- belongs_to :item
- belongs_to :user

# Attributes
- title :string
- body :text
- rating :integer