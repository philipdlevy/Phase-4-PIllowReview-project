Online pillow store

Overview: (Features)
- User(customer)
- Items
- Reviews
- Cart
- Login/out


MVP:
- Login/out
- look at items
- put items in a cart
- leave a review
- create, update, delete and see reviews


Models
- cart
- user
- review
- item

Associations and attributes:
# Cart
- cart belongs_to :user
- has_many :items

# Attributes
- is_active? :boolean




-----------------------------------------

# User
- has_many :carts
- has_many :reviews
- has_many :items, through: :carts

# Attributes
- username :string
- password_digest :string



-----------------------------------------

# Item
- belongs_to :cart
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