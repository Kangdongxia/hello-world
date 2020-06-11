export function formatRole(role) {
        let formatRole = "";  
        switch(role){
          case 0:
              formatRole = '普通用户';
              break;
          case 1:
              formatRole = '管理员';
              break; 
          case 2:
              formatRole = '审核员';
              break;          
        }
        return formatRole;
}

  