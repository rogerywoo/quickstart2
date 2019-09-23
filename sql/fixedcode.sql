CREATE TABLE ProcedureTemplate
  (
	TemplateName VARCHAR (200) NULL,
	Template VARCHAR (MAX) NULL
  )
  GO
  INSERT INTO ProcedureTemplate(TemplateName, Template)
  VALUES('Insert','
GO
/****** Object:  StoredProcedure [dbo].[usp_~N_Ins]    Script Date: 3/6/2015 3:32:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF EXISTS(SELECT NAME FROM SYSOBJECTS WHERE NAME = ''usp_~N_Ins'')
  BEGIN
	DROP PROCEDURE usp_~N_Ins
  END
  GO
/* ============================================================================
 Author:      ~U
 Create date: ~D
 Description: Add description

				History
 Date			Name				Comments
 ==============================================================================

 ==============================================================================*/
CREATE PROCEDURE [dbo].[usp_~N_Ins]
(
	~I
)
AS
BEGIN

	SET FMTONLY OFF;
    SET NOCOUNT ON;
    DECLARE @ErrorMessage		VARCHAR(MAX)
			,@ErrorProcedure	VARCHAR(255)
			,@ErrorSeverity		INT
			,@ErrorState		INT
			,@ErrorLine			INT

    BEGIN TRY
		INSERT INTO ~N
		(
			~C
		)
		VALUES
		(
			~V
		)

    END TRY
    BEGIN CATCH

         SELECT  @ErrorMessage		= ERROR_MESSAGE()
				,@ErrorSeverity		= ERROR_SEVERITY()
				,@ErrorProcedure	= ERROR_PROCEDURE()
				,@ErrorState		= ERROR_STATE()
				,@ErrorLine			= ERROR_LINE()

		SET @ErrorMessage = ''Procedure: '' + @ErrorProcedure + space(1) + 
		@ErrorMessage + '' Line: '' + CONVERT(VARCHAR(20),@ErrorLine)


        RAISERROR ( @ErrorMessage, @ErrorSeverity, @ErrorState)

    END CATCH
END
GO
')
GO
 INSERT INTO ProcedureTemplate(TemplateName, Template)
 VALUES('Update','
GO
/****** Object:  StoredProcedure [dbo].[usp_~N_Upd]    Script Date: 3/6/2015 3:32:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF EXISTS(SELECT NAME FROM SYSOBJECTS WHERE NAME = ''usp_~N_Upd'')
  BEGIN
	DROP PROCEDURE usp_~N_Upd
  END
  GO
/* ============================================================================
 Author:      ~U
 Create date: ~D
 Description: Add description

				History
 Date			Name				Comments
 ==============================================================================

 ==============================================================================*/
CREATE PROCEDURE [dbo].[usp_~N_Upd]
(
	@RecID INT,
	~I
)
AS
BEGIN

	SET FMTONLY OFF;
    SET NOCOUNT ON;
         DECLARE @ErrorMessage		VARCHAR(MAX)
				,@ErrorProcedure	VARCHAR(255)
				,@ErrorSeverity		INT
				,@ErrorState		INT
				,@ErrorLine			INT

    BEGIN TRY
		UPDATE ~N
		SET ~C
		WHERE RecID = @RecID

    END TRY
    BEGIN CATCH

         SELECT  @ErrorMessage		= ERROR_MESSAGE()
				,@ErrorSeverity		= ERROR_SEVERITY()
				,@ErrorProcedure	= ERROR_PROCEDURE()
				,@ErrorState		= ERROR_STATE()
				,@ErrorLine			= ERROR_LINE()

		SET @ErrorMessage = ''Procedure: '' + @ErrorProcedure + '' '' + 
		@ErrorMessage + '' Line: '' + CONVERT(VARCHAR(20),@ErrorLine)


        RAISERROR ( @ErrorMessage, @ErrorSeverity, @ErrorState)

    END CATCH
END
GO')
go
 INSERT INTO ProcedureTemplate(TemplateName, Template)
 VALUES('Delete','
GO
/****** Object:  StoredProcedure [dbo].[usp_~N_Del]    Script Date: 3/6/2015 3:32:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF EXISTS(SELECT NAME FROM SYSOBJECTS WHERE NAME = ''usp_~N_Del'')
  BEGIN
	DROP PROCEDURE usp_~N_Del
  END
  GO
/* ============================================================================
 Author:      ~U
 Create date: ~D
 Description: Add description

				History
 Date			Name				Comments
 ==============================================================================

 ==============================================================================*/
CREATE PROCEDURE [dbo].[usp_~N_Del]
(
	@RecID INT

)
AS
BEGIN

	SET FMTONLY OFF;
    SET NOCOUNT ON;
         DECLARE @ErrorMessage		VARCHAR(MAX)
				,@ErrorProcedure	VARCHAR(255)
				,@ErrorSeverity		INT
				,@ErrorState		INT
				,@ErrorLine			INT

    BEGIN TRY
		DELETE ~N
		WHERE RecID = @RecID

    END TRY
    BEGIN CATCH

         SELECT  @ErrorMessage		= ERROR_MESSAGE()
				,@ErrorSeverity		= ERROR_SEVERITY()
				,@ErrorProcedure	= ERROR_PROCEDURE()
				,@ErrorState		= ERROR_STATE()
				,@ErrorLine			= ERROR_LINE()

		SET @ErrorMessage = ''Procedure: '' + @ErrorProcedure + '' '' + 
		@ErrorMessage + '' Line: '' + CONVERT(VARCHAR(20),@ErrorLine)


        RAISERROR ( @ErrorMessage, @ErrorSeverity, @ErrorState)

    END CATCH
END
GO')
GO
 INSERT INTO ProcedureTemplate(TemplateName, Template)
 VALUES('Set','
GO
/****** Object:  StoredProcedure [dbo].[usp_~N_Set]    Script Date: 3/6/2015 3:32:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF EXISTS(SELECT NAME FROM SYSOBJECTS WHERE NAME = ''usp_~N_Set'')
  BEGIN
	DROP PROCEDURE usp_~N_Set
  END
  GO
/* ============================================================================
 Author:      ~U
 Create date: ~D
 Description: Add description

				History
 Date			Name				Comments
 ==============================================================================

 ==============================================================================*/
CREATE PROCEDURE [dbo].[usp_~N_Set]
(
	@RecID INT,
	~I
)
AS
BEGIN

	SET FMTONLY OFF;
    SET NOCOUNT ON;
         DECLARE @ErrorMessage		VARCHAR(MAX)
				,@ErrorProcedure	VARCHAR(255)
				,@ErrorSeverity		INT
				,@ErrorState		INT
				,@ErrorLine			INT

    BEGIN TRY
		SELECT ~C
		FROM ~N
		WHERE ~V

    END TRY
    BEGIN CATCH

         SELECT  @ErrorMessage		= ERROR_MESSAGE()
				,@ErrorSeverity		= ERROR_SEVERITY()
				,@ErrorProcedure	= ERROR_PROCEDURE()
				,@ErrorState		= ERROR_STATE()
				,@ErrorLine			= ERROR_LINE()

		SET @ErrorMessage = ''Procedure: '' + @ErrorProcedure + '' '' + 
		@ErrorMessage + '' Line: '' + CONVERT(VARCHAR(20),@ErrorLine)


        RAISERROR ( @ErrorMessage, @ErrorSeverity, @ErrorState)

    END CATCH
END
')
GO
-------------------------END --------------------------------------------------------------------------------------------------------------------

-------------------------------------Stored procedure here --------------------------------------------------------------------------------------
GO
/****** Object:  StoredProcedure [dbo].[usp_CreateCRUDbyTableName]    Script Date: 3/6/2015 3:32:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF EXISTS(SELECT NAME FROM SYSOBJECTS WHERE NAME = 'usp_CreateCRUDbyTableName')
  BEGIN
	DROP PROCEDURE usp_CreateCRUDbyTableName
  END
GO
/* ============================================================================
 Author:      Mitchell Guzman
 Create date: 2015-04-23
 Description: Creates the CRUD by Table Name

 Example:
 EXEC usp_CreateCRUDbyTableName @TableName = 'MarginRounder'
				History
 Date			Name				Comments
 ==============================================================================

 ==============================================================================*/
CREATE PROCEDURE [dbo].[usp_CreateCRUDbyTableName]
(
  @TableName VARCHAR(255)
)
AS
BEGIN
	--Get Insert Template
	DECLARE	@InputParams		VARCHAR(2000) = ''
			,@OutputParams		VARCHAR(2000) = ''
			,@InsertTemplate	VARCHAR(MAX)
			,@UpdateTemplate	VARCHAR(MAX)
			,@DeleteTemplate	VARCHAR(MAX)
			,@SetTemplate		VARCHAR(MAX)
			,@Columns			VARCHAR(MAX) = ''
			,@Columns1			VARCHAR(MAX) = ''
			,@User				VARCHAR(50) = ''
			,@CurDate			VARCHAR(20)
			,@ErrorMessage		VARCHAR(MAX)
			,@ErrorProcedure	VARCHAR(255)
			,@ErrorSeverity		INT
			,@ErrorState		INT
			,@ErrorLine			INT

	BEGIN TRY
		--Input params
		SELECT @User = REPLACE(SYSTEM_USER,'MIDDLE_EARTH\',''), 
                       @CurDate = CONVERT(VARCHAR(20),GETDATE(),100)

		SELECT  @InputParams = @InputParams + CHAR(9) + '@' + sc.name  + ' ' +  
		UPPER(st.name)  + ' ' + case when sc.user_type_id in (167,175,231,239) 
		then '(' + convert(varchar(20),CASE WHEN CONVERT(VARCHAR(6),sc.max_length) = '-1' 
		THEN 'MAX' ELSE CONVERT(VARCHAR(6),sc.max_length) END ) + ')' ELSE '' END + '' + 
		CASE WHEN sc.user_type_id in(59,60,106,108,122) THEN '(' + convert(varchar(5),sc.precision) + 
		',' + convert(varchar(5),sc.scale) + ')' ELSE '' END +  ',' + CHAR(10)  
		FROM sys.columns SC (NOLOCK) JOIN SYSOBJECTS SO(NOLOCK) ON SO.ID = SC.object_ID 
		JOIN sys.types ST (NOLOCK) ON ST.user_TYPE_ID = SC.user_TYPE_ID  WHERE so.type = 'U'  
		and so.name = @TableName and sc.is_identity = 0 order by Column_ID
		SELECT @InputParams = LEFT(@InputParams,LEN(@InputParams) - 2)

		SELECT @OutputParams = @OutputParams + CHAR(9)  + sc.name  + ' ' +  UPPER(st.name)  + 
		' ' + case when sc.user_type_id in (167,175,231,239) 
        then '(' + convert(varchar(20),sc.max_length) + ')' 
		ELSE '' END + '' + CASE WHEN sc.user_type_id in(59,60,106,108,122) THEN '(' + 
		convert(varchar(5),sc.precision) + ',' + convert(varchar(5),sc.scale) + ')' ELSE '' 
		END +  ',' + CHAR(10)  FROM sys.columns SC (NOLOCK) JOIN SYSOBJECTS SO(NOLOCK) 
		ON SO.ID = SC.object_ID JOIN sys.types ST (NOLOCK) ON ST.user_TYPE_ID = SC.user_TYPE_ID  
		WHERE so.type = 'U'  and so.name = @TableName and sc.is_identity = 0 order by Column_ID
		SELECT @OutputParams = LEFT(@OutputParams,LEN(@OutputParams) - 2)

		SELECT @Columns = @Columns + CHAR(9) +  SC.NAME + ',' + CHAR(10) + CHAR(9) + CHAR(9)
		FROM SYS.OBJECTS SO (NOLOCK)
		JOIN SYS.COLUMNS SC (NOLOCK) ON SC.object_id = SO.object_id
		WHERE SO.NAME = @TableName
		 AND sc.is_identity = 0
		 ORDER BY SC.NAME

		SET @Columns = LEFT(@Columns,LEN(@Columns) - 4)

		SELECT @Columns1 = @Columns1 + CHAR(9) + '@' +  SC.NAME + ',' + CHAR(10)+ CHAR(9) + CHAR(9)
		FROM SYS.OBJECTS SO (NOLOCK)
		JOIN SYS.COLUMNS SC (NOLOCK) ON SC.object_id = SO.object_id
		WHERE SO.NAME = @TableName
		 AND sc.is_identity = 0
		ORDER BY SC.NAME

		SET @Columns1 = LEFT(@Columns1,LEN(@Columns1) - 4)
		---------------------------------------
		---Insert
		---------------------------------------
		SELECT @InsertTemplate = Template
		FROM ProcedureTemplate t (NOLOCK)
		WHERE TemplateName = 'Insert'

		SET @InsertTemplate = REPLACE(@InsertTemplate,'~N',@TableName)
		SET @InsertTemplate = REPLACE(@InsertTemplate,'~U',@User)
		SET @InsertTemplate = REPLACE(@InsertTemplate,'~I',@InputParams)
		SET @InsertTemplate = REPLACE(@InsertTemplate,'~C',@Columns)
		SET @InsertTemplate = REPLACE(@InsertTemplate,'~V',@Columns1)
		SET @InsertTemplate = REPLACE(@InsertTemplate,'~D',@CurDate)

		SELECT @InsertTemplate

		------------------------------------
		---Update
		------------------------------------
		SELECT @UpdateTemplate = Template
		FROM ProcedureTemplate t (NOLOCK)
		WHERE TemplateName = 'Update'

		SET @Columns1 = ''

		SELECT @Columns1 = @Columns1 + CHAR(9) + SC.NAME + ' = ' + '@' +  
		SC.NAME + ',' + CHAR(10)+ CHAR(9) + CHAR(9)+ CHAR(9)
		FROM SYS.OBJECTS SO (NOLOCK)
		JOIN SYS.COLUMNS SC (NOLOCK) ON SC.object_id = SO.object_id
		WHERE SO.NAME = @TableName
		 AND sc.is_identity = 0
		ORDER BY SC.NAME

		SET @Columns1 = LEFT(@Columns1,LEN(@Columns1) - 5)

		SET @UpdateTemplate = REPLACE(@UpdateTemplate,'~N',@TableName)
		SET @UpdateTemplate = REPLACE(@UpdateTemplate,'~U',@User)
		SET @UpdateTemplate = REPLACE(@UpdateTemplate,'~I',@InputParams)
		SET @UpdateTemplate = REPLACE(@UpdateTemplate,'~C',@Columns1)
		SET @UpdateTemplate = REPLACE(@UpdateTemplate,'~D',@CurDate)

		SELECT @UpdateTemplate

		------------------------------------
		---DELETE
		------------------------------------
		SELECT @DeleteTemplate = Template
		FROM ProcedureTemplate t (NOLOCK)
		WHERE TemplateName = 'Delete'

		SET @DeleteTemplate = REPLACE(@DeleteTemplate,'~N',@TableName)
		SET @DeleteTemplate = REPLACE(@DeleteTemplate,'~U',@User)
		SET @DeleteTemplate = REPLACE(@DeleteTemplate,'~D',@CurDate)

		SELECT @DeleteTemplate

		------------------------------------
		---SET
		------------------------------------
		SELECT @SetTemplate = Template
		FROM ProcedureTemplate t (NOLOCK)
		WHERE TemplateName = 'Set'

		SET @InputParams = ''
		SELECT  @InputParams = @InputParams + CHAR(9) + '@' + sc.name  + ' ' +  
		UPPER(st.name)  + ' ' + case when sc.user_type_id in (167,175,231,239) 
		then '(' + convert(varchar(20),CASE WHEN CONVERT(VARCHAR(20),sc.max_length) = '-1' 
		THEN 'MAX' ELSE CONVERT(VARCHAR(20),sc.max_length) END) + ')' ELSE '' END + '' + CASE 
		WHEN sc.user_type_id in(59,60,106,108,122) THEN '(' + convert(varchar(5),sc.precision) + ',' + 
		convert(varchar(5),sc.scale) + ')' ELSE '' END +  CHAR(9) + ' = NULL,' + CHAR(10)    
		FROM sys.columns SC (NOLOCK) JOIN SYSOBJECTS SO(NOLOCK) ON SO.ID = 
		SC.object_ID JOIN sys.types ST (NOLOCK) ON ST.user_TYPE_ID = SC.user_TYPE_ID  
		WHERE so.type = 'U'  and so.name = @TableName and sc.is_identity = 0 order by Column_ID
		SELECT @InputParams = LEFT(@InputParams,LEN(@InputParams) - 2)


		SET @Columns = ''
		SELECT @Columns = @Columns + CHAR(9) +  SC.NAME + ',' + CHAR(10) + CHAR(9) + CHAR(9) + CHAR(9)
		FROM SYS.OBJECTS SO (NOLOCK)
		JOIN SYS.COLUMNS SC (NOLOCK) ON SC.object_id = SO.object_id
		WHERE SO.NAME = @TableName
		ORDER BY SC.name
		 --AND sc.is_identity = 0

		SET @Columns1 = ''
		SELECT @Columns1 = @Columns1 + CHAR(9) +  '(@' + SC.NAME + ' IS NULL OR ' + 
		SC.NAME + ' =  @' + SC.NAME + ')' + CHAR(10)  + CHAR(9) + CHAR(9)  + ' AND'
		FROM SYS.OBJECTS SO (NOLOCK)
		JOIN SYS.COLUMNS SC (NOLOCK) ON SC.object_id = SO.object_id
		WHERE SO.NAME = @TableName
		ORDER BY SC.name

		IF RIGHT(@Columns1,3) = 'AND'
		  BEGIN
			SET @Columns1 = LEFT(@Columns1,LEN(@Columns1) - 3)
		  END
		SET @Columns = LEFT(@Columns,LEN(@Columns) - 5)

		SET @SetTemplate = REPLACE(@SetTemplate,'~N',@TableName)
		SET @SetTemplate = REPLACE(@SetTemplate,'~C',@Columns)
		SET @SetTemplate = REPLACE(@SetTemplate,'~U',@User)
		SET @SetTemplate = REPLACE(@SetTemplate,'~I',@InputParams)
		SET @SetTemplate = REPLACE(@SetTemplate,'~V',@Columns1)
		SET @SetTemplate = REPLACE(@SetTemplate,'~D',@CurDate)

		SELECT @SetTemplate
	 END TRY
	 BEGIN CATCH

         SELECT  @ErrorMessage		= ERROR_MESSAGE()
				,@ErrorSeverity		= ERROR_SEVERITY()
				,@ErrorProcedure	= ERROR_PROCEDURE()
				,@ErrorState		= ERROR_STATE()
				,@ErrorLine			= ERROR_LINE()

		SET @ErrorMessage = 'Procedure: ' + @ErrorProcedure + ' ' + 
		@ErrorMessage + ' Line: ' + CONVERT(VARCHAR(6),@ErrorLine)

        RAISERROR ( @ErrorMessage, @ErrorSeverity, @ErrorState)

    END CATCH
	END