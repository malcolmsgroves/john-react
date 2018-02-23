class Toilet < ApplicationRecord
  reverse_geocoded_by :lat, :lng
  validates :name, presence: true
  validates :toilet_type, presence: true
  validates :lat, presence: true
  validates :lng, presence: true
  has_many :reviews

  def Toilet.nearby(lat, lng)
    Toilet.near([lat, lng], 5000)
  end

  def average_rating
    if(reviews.empty?)
      "No reviews"
    else
      self.reviews.average(:rating).round(1)
    end
  end
end
