import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';

import { v1 as uuid } from 'uuid'; //v1-> uuid의 version1 사용한다는 뜻
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
    //db를 안 써서 배열 사용..
    private boards: Board[] = []; //다른 컴포넌트에서 배열 값 수정할 수 없게.
    //Board 모델 객체를 담을 것


    //getboardlist
    getAllBoards(): Board[] { //boardcontroller에서 사용 / board[] -> 리턴값 지정!
        return this.boards;
    }


    //createboard
    // createBoard(title: string, description: string) {
    createBoard(createBoardDto: CreateBoardDto) {
        // const title = createBoardDto.title;
        const {title, description} = createBoardDto;
        //윗 두줄 => dto 적용

        //1. serializer
        const board: Board = { 
            // title: title,
            // description: description, //이렇게 왼오 같으면 아래와 같이 축약 가능.
            id: uuid(), //unique 한 값 부여
            title,
            description,
            status: BoardStatus.PUBLIC, //default값 넣음
        }

        this.boards.push(board);
        return board;
    }



    //getboard
    getBoardById(id: string): Board {
        //find -> 배열에서 id에 맞는 board 탐색
        // return this.boards.find((board) => board.id === id); //id가 잘못될 경우를 예외처리해주자.

        const found = this.boards.find(board => board.id === id);

        if (!found) {
            throw new NotFoundException(`Can't found Board with id ${id}`);
        }

        return found;
    }


    //deleteBoard
    deleteBoard(id: string): void {
        //삭제니까 return 안해도 됨 (= 반환값도 void)
        //filter를 사용해서 삭제 조건에 맞는 건 필터링에 걸리게 함.
        // this.boards = this.boards.filter((board) => board.id !== id); //예외처리 필요

        const found = this.getBoardById(id); //예외 발생 시 여기서 return throwexception이 될것.

        this.boards = this.boards.filter(board => board.id !== found.id);
    }


    //updateBoardStatus
    updateBoardStatus(id: string, status: BoardStatus): Board {
        const board = this.getBoardById(id);
        board.status = status;

        // if (!board) {
        //     throw new NotFoundException('board is not found')
        // }

        // if (!board.status) {
        //     throw new NotFoundException('status is strange');
        // }

    
        return board;
    }
}
