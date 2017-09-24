class User < ApplicationRecord
  before_save { email.downcase! }
  before_save { username.downcase! }

  validates :name, presence: true, length: { maximum: 20 }

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i
  validates :email, presence: true,length: { maximum: 50 },
                    format: { with: VALID_EMAIL_REGEX },
                    uniqueness: { case_sensitive: false }

  VALID_USERNAME_REGEX = /\A[a-zA-Z]+\z/
  validates :username, presence: true, length: { maximum: 16 },
            format: { with: VALID_USERNAME_REGEX },
            uniqueness: { case_sensitive: false }

  has_secure_password
  validates :password, presence: true, length: { in: 6..20 }
end

