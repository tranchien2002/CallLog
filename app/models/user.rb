class User < ApplicationRecord
    attr_accessor :remember_token
    before_save { self.email = email.downcase }
    VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
    validates :email, presence: true, length: { maximum: 255 },
                      format: { with: VALID_EMAIL_REGEX }

    has_secure_password
    validates :password, presence: true, length: { minimum: 1 }
    has_many :works, class_name: "Ticket", foreign_key: "assign_to", dependent: :destroy
    has_many :requests, class_name: "Ticket",foreign_key: "requester",dependent: :destroy
    has_many :relations,foreign_key: :user_id
    has_many :tickets,through: :relations
    has_many :comments, foreign_key: "user_id",dependent: :destroy
    belongs_to :team,foreign_key: :team_id,optional: :true

    def self.digest(string)
        cost = ActiveModel::SecurePassword.min_cost ? BCrypt::Engine::MIN_COST :
                   BCrypt::Engine.cost
        BCrypt::Password.create(string, cost: cost)
    end

    # Returns a random token.
    def self.new_token
        SecureRandom.urlsafe_base64
    end

    # Remembers a user in the database for use in persistent sessions.
    def remember
      self.remember_token = User.new_token
      update_attribute(:remember_digest, User.digest(remember_token))
    end

    def authenticated?(remember_token)
      return false if remember_digest.nil?
      BCrypt::Password.new(remember_digest).is_password?(remember_token)
    end

    def forget
      update_attribute(:remember_digest, nil)
    end

    def text
      name
    end
end
