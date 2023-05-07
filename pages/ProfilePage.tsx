import React from 'react'
import styled from 'styled-components';
import useFirebase from '../hooks/useFirebase';

const LogOutContainer = styled.View`
    align-items: center;
    margin-top: 20%;
`
const LogOutButton = styled.TouchableOpacity`
    padding: 5%;
    background-color: #ff4049;
    border-radius: 15px;
`
const LogOutText = styled.Text`
    font-size: 15px;
    color: #fff;
    font-weight: 600;
`
const PageContainer = styled.View`
    flex: 1;
    background-color: #fff;
`
const ProfilePage = () => {
    const {handleSignOutUser} = useFirebase();
  return (
    <PageContainer>
        <LogOutContainer >
            <LogOutButton onPress={handleSignOutUser}>
                <LogOutText>Log Out</LogOutText>
            </LogOutButton>
        </LogOutContainer>
    </PageContainer>
  )
}

export default ProfilePage