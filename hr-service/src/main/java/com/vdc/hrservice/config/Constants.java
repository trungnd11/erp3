
package com.vdc.hrservice.config;

public class Constants {
    
    public static enum MODE {
        CREATE, UPDATE, DELETE, READ;
    }
    
    public static final String SYSTEM = "system";
    public final static String EMPLTY_STRING = "";
    public final static boolean DELFLG_ZERO = false;
    public final static boolean DELFLG_ONE = true;
    public static final boolean ALIVE = false;
    public static final boolean NON_ALIVE = true;

    public class SHARE_LEVEL{
		public final static String  SPECIFIC =  "SPECIFIC";
		public final static String  GENERAL = "GENERAL";
				
	}
	
	public class GROUP_TARGET{
		public final static int  FINANCE =  0;
		public final static int  CUSTOMER = 1 ;
		public final static int  PROCEDURE = 2 ;	
		public final static int  TRAIN = 3 ;
	}
	
	public class TARGET_STATUS{
		public final static char  FINISHED =  '1';
		public final static char UNFINISHED = '0';
				
	}
	
	public class TARGET_CALCULATION{
		public final static int TARGET_CHILD_OR_JOB = 0;
		public final static int TARGET_CHILD = 1;
		public final static int JOBS = 2;
		public final static int AUTO = 3;
		public final static int SPENDING_RESULTS = 4;
		public final static int LINK_TARGET = 5;
		
	}

	public class TARGET_TYPE{
		public final static int  STAFF =  0;
		public final static int  DEPARTMENT = 1;
				
	}
	
	public class COLOR_CODE{
		public final static String BLUE = "#3f51b5";
		public final static String INFO = "#2196f3";
		public final static String WARNING = "#ffc107";
		public final static String ERROR = "#f44336";
		public final static String SUCCESS = "#4caf50";
		public final static String GRAY = "#9e9e9e";
		public final static String BLACK = "#212121";
		public final static String PURPLE = "#9c27b0";
	}

	public class PROJECT_STATUS{
		public final static String INPROGRESS = "Inprogress";
		public final static String COMPLETED = "Completed";
	}

	public class QUALITY_TYPE{
		public final static String LOW = "Low";
		public final static String MEDIUM = "Medium";
		public final static String NORMAL = "Normal";
		public final static String GOOD = "Good";
		public final static String VERY_GOOD = "Very good";
	}

	public class CACULATE_METHOD{
		public final static int AUTO_USER_UPDATE = 1;
		public final static int RATIO_WORK_COMPLETE = 2;
		public final static int RATIO_SUBTASK_COMPLETE = 3;
	}

	public class TYPE_DURATION{
		public final static String HOUR = "Hour";
		public final static String DATE = "Date";
	}

	public class TASK_STATUS{
		public final static String UNFINISHED = "unfinished";
		public final static String FINISHED = "finished";
	}

	public class PRIVACY{
		public final static String PUBLIC = "public";
		public final static String PRIVATE = "private";
		public final static String TEAM = "team";
	}

	public class TYPE_SPRINT{
		public final static String LIST = "list";
		public final static String KANBAN = "kanban";
	}

    private Constants() {}


}
