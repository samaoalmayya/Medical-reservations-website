
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import { styled, useTheme } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import EventNoteIcon from '@mui/icons-material/EventNote';

import { Avatar, Box, Divider, Typography } from '@mui/material';
import { SpaceDashboard, VolunteerActivism } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { grey } from '@mui/material/colors'

const drawerWidth = 240;
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    variants: [
      {
        props: ({ open }) => open,
        style: {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': openedMixin(theme),
        },
      },
      {
        props: ({ open }) => !open,
        style: {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme),
        },
      },
    ],
  }),
);


const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));



export default function Drawar({handleDrawerClose,open}) {
    const navigate = useNavigate();
      let location = useLocation();
      const theme = useTheme();
      const Arrry1 =[{"text": "Dashboard", "icon": <SpaceDashboard/>,"path":"/"},
                    {"text": "Patients", "icon": <PersonIcon/> ,"path":"/Patients"}
                    ,{"text": "schedule", "icon": <EventNoteIcon/>,"path":"/schedule"}
      ];
  return (
     <Drawer variant="permanent" 
// @ts-ignore
     open={open}>
        <DrawerHeader>
         
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
          
        </DrawerHeader>
         {/* <Box sx={{display :"flex " , gap:"15px"}}> 
             <VolunteerActivism></VolunteerActivism>
            <Typography sx={{paddingRight:"40px", color:"black" ,fontSize:"18px", letterSpacing:"1px"}}>
             DentalCare
          </Typography></Box> */}
          <Avatar sx={{mx:"auto",width: open? 80: 40,height: open? 80: 40,transition:"0.3s"}} alt="Travis Howard" src="src\img\1.jpg" />
          <Typography sx={{mx:"auto", fontSize: open? 17: 0,transition:"0.3s"}} color="initial">Dr.Samaoal</Typography>
          <Typography sx={{fontSize: open? 13: 0,mx:"auto",pb:"10px",transition:"0.3s"}} color="blue">DentalCare</Typography>
        <Divider></Divider>
        <List>
          {Arrry1.map((items) => (
            <ListItem key={items.text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
              onClick={() => {
                 navigate(items.path)
              } 
              }
                sx={[
                  {
                    minHeight: 48,
                    px: 2.5,
                    bgcolor: location.pathname === items.path ? grey[100] : null
                  },
                  open
                    ? {
                        justifyContent: 'initial',
                      }
                    : {
                        justifyContent: 'center',
                      },
                ]}
              >
                <ListItemIcon
                  sx={[
                    {
                      minWidth: 0,
                      justifyContent: 'center',
                    },
                    open
                      ? {
                          mr: 3,
                        }
                      : {
                          mr: 'auto',
                        },
                  ]}
                >
                  {items.icon}
                </ListItemIcon>
                <ListItemText
                  primary={items.text}
                  sx={[
                    open
                      ? {
                          opacity: 1,
                        }
                      : {
                          opacity: 0,
                        },
                  ]}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
    
      </Drawer>
  )
}
