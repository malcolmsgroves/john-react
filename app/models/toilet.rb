class Toilet < ApplicationRecord
  reverse_geocoded_by :lat, :lng
  validates :name, presence: true
  validates :toilet_type, presence: true
  validates :lat, presence: true
  validates :lng, presence: true

  def Toilet.nearby(lat, lng)
    Toilet.near([lat, lng], 5000)
  end
end
