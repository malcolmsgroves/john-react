class RenameToiletsTypeToToiletType < ActiveRecord::Migration[5.1]
  def change
    rename_column :toilets, :type, :toilet_type
  end
end
