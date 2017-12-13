class Ticket < ApplicationRecord
  has_many :relations,foreign_key: :ticket_id
  has_many :users, through: :relations
  belongs_to :customer, class_name: "User",optional: true
  belongs_to :staff, class_name: "User",optional: true
end
