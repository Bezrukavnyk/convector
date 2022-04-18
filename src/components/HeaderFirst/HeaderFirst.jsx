import { Typography } from '@mui/material';

const HeaderFirst = ({children}) => {
    return(
        <Typography variant="h1"
         component="h1"
         mt={5} ml={3} mr={3}
         color="#76705e"
         fontWeight={600}>
         {children}
        </Typography> 
    )
}
export default HeaderFirst;