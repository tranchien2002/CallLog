class Relation < ApplicationRecord
  belongs_to :ticket,foreign_key: :ticket_id, optional: true
  belongs_to :user,foreign_key: :user_id, optional: true
end
