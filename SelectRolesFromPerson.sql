declare @ObjectId as uniqueidentifier = 'dea4a40f-72ed-4e41-b1f5-ed2785eebb62'


SELECT TOP (1000) [InternalId]
      ,[ObjectId]
      ,[CompanyDataId]
      ,[PreferredLanguageId]
      ,[Timezone]
      ,[IsIntegrationUser]
  FROM [dbo].[User]
  WHERE ObjectId = @ObjectId

  SELECT ur.*, r.Name From UserRole ur, dbo.Role r
  WHERE UserId IN (SELECT InternalId FROM [dbo].[User] WHERE ObjectId = @ObjectId)
  AND ur.RoleId = r.InternalId


 -- DELETE FROM UserRole  WHERE InternalId = 'dc7802d1-7aea-456d-9b0d-b49eccfa711d'