object @farm
extends "api/v1/places/show"
# Redundant integration of attributes to being included in the response.
# FIXME Should DRY Rabl templates somewhen in the future.
attributes :founded_at_year, :founded_at_month, :maximum_members, :products, :farming_standard, :participation