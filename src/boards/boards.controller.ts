import { Controller, Get, Post, Body, Param, Delete, Patch, UsePipes, ValidationPipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './board.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
    constructor(private boardsService: BoardsService) {}

    @Get('/:id')
    getBoardById(@Param('id') id: number): Promise<Board> {
        return this.boardsService.getBoardById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(@Body() CreateBoardDto: CreateBoardDto): Promise<Board> {
        return this.boardsService.createBoard(CreateBoardDto);
    }

    @Delete('/:id')
    deleteBoard(@Param('id', ParseIntPipe) id) {//파라미터레벨로 parseintpipe: 파라미터의 인자가 숫자값인지 확인.
        return this.boardsService.deleteBoard(id);
    }

    @Patch('/:id/status')
    updateBoardStatus (
        @Param('id', ParseIntPipe) id: number,
        @Body('status', BoardStatusValidationPipe) status: BoardStatus,
    ){
      return this.boardsService.updateBoardStatus(id, status);  
    }

    @Get()
    getAllBoard(): Promise<Board[]> {
        return this.boardsService.getAllBoards();
    }

    /*
    constructor(private boardsService: BoardsService) { } //di

    //클라이언트에서 보낸 요청 받음
    @Get('/') //get 요청이 오면
    getAllBoard(): Board[] { //다음 메서드를 실행해라  //리턴값 타입 설정
        return this.boardsService.getAllBoards();
    }
    //get -> response: []

    @Post('/')
    @UsePipes(ValidationPipe) //pipe
    createBoard(
        // @Body('title') title: string,  //클라 -> 핸들러로
        // @Body('description') description: string
        //번거로워 -> DTO로!

        @Body() createBoardDto: CreateBoardDto //dto 사용

    ): Board { //리턴값 = Board객체 하나
        // return this.boardsService.createBoard(title, description); //핸들러 -> 서비스단으로
        
        return this.boardsService.createBoard(createBoardDto);
    }


    // localhost:5000?id=djfafi
    @Get('/:id')
    getBoardById(@Param('id') id: string): Board {
        return this.boardsService.getBoardById(id);
    }

    @Delete('/:id')
    deleteBoard(@Param('id') id: string): void {
        this.boardsService.deleteBoard(id);
    }

    @Patch('/:id/status')
    updateBoardStatus(
        @Param('id') id: string,
        @Body('status', BoardStatusValidationPipe) status: BoardStatus,
    ): Board {
        return this.boardsService.updateBoardStatus(id, status);
    }
    */


    
}
