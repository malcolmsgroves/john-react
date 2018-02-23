class Review < ApplicationRecord
  belongs_to :toilet
  validate :rating_must_be_in_range

  def rating_must_be_in_range
    if(rating < 1 || rating > 5)
      errors.add(:rating, "must be between 1 and 5 inclusive")
    end
  end
end
